// 0) Imports & Admin init
const admin = require('firebase-admin')
const path  = require('path')
const { getAuth } = require('firebase-admin/auth')

const serviceAccount = process.env.SERVICE_ACCOUNT_JSON
  ? JSON.parse(process.env.SERVICE_ACCOUNT_JSON)
  : require(path.resolve(__dirname, '../serviceAccountKey.json'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const authAdmin = getAuth()
const db = admin.firestore()
const { Timestamp, FieldValue } = admin.firestore

// 1) Canonical providers (must match actual Firebase Auth emails)
const providers = [
  {
    id: 'pastor-stephen-magare',
    displayName: 'Pastor Stephen Magare',
    email: 'stevecr58@gmail.com',
    type: 'Pastor',
    subscribed: true,
    photoURL: 'https://example.com/photos/stephen.jpg',
    bio: 'I’ve been leading worship for over 10 years…',
  },
  {
    id: 'angels-choir',
    displayName: 'Angels Choir',
    email: 'angels@example.com',  // <- MUST exist in Auth, otherwise will be skipped
    type: 'Choir',
    subscribed: true,
    photoURL: 'https://example.com/photos/angels.jpg',
    bio: 'A dynamic choir from Nairobi…',
  },
  {
    id: 'mary-bible-student',
    displayName: 'Mary Njeri',
    email: 'mary@example.com',    // <- MUST exist in Auth
    type: 'BibleStudent',
    subscribed: true,
    photoURL: 'https://example.com/photos/mary.jpg',
    bio: 'Bible student passionate about outreach…',
  },
]

// 2) Booking stubs
const bookingStubs = [
  // … same as before
]

// 3) Upsert providers with real UID
async function seedProviders() {
  console.log('🌱 Seeding providers…')
  const seeded = []  // keep track of successful IDs

  for (const p of providers) {
    try {
      const userRecord = await authAdmin.getUserByEmail(p.email)
      const realUid = userRecord.uid

      await db.collection('providers').doc(p.id).set({
        id: p.id,
        userId: realUid,
        displayName: p.displayName,
        email: p.email,
        type: p.type,
        subscribed: p.subscribed,
        photoURL: p.photoURL,
        bio: p.bio,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })

      console.log(`  ✔️  ${p.displayName} → UID: ${realUid}`)
      seeded.push({ ...p, userId: realUid })
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        console.warn(`  ⚠️  Auth user not found for ${p.email}, skipping provider '${p.id}'`)
      } else {
        throw err  // fatal
      }
    }
  }
  return seeded
}

// 4) Clean duplicate providers
async function cleanDuplicateProviders() {
  console.log('🧹 Cleaning duplicate providers…')
  const snapshot = await db.collection('providers').get()
  const byUser = snapshot.docs.reduce((acc, d) => {
    const data = d.data()
    acc[data.userId] = acc[data.userId] || []
    acc[data.userId].push(d.id)
    return acc
  }, {})

  for (const [userId, ids] of Object.entries(byUser)) {
    // choose the first seeded doc as canonical
    const canonical = ids[0]
    for (const docId of ids) {
      if (docId !== canonical) {
        await db.collection('providers').doc(docId).delete()
        console.log(`  🗑 Deleted duplicate provider doc: ${docId}`)
      }
    }
  }
}

// 5) Upsert & clean booking stubs
async function upsertAndCleanBooking(stub, seededProviders) {
  const prov = seededProviders.find((p) => p.id === stub.providerSlug)
  if (!prov) {
    console.warn(`  ⚠️ Stub skipped, provider not seeded: ${stub.providerSlug}`)
    return
  }

  const userId = prov.userId
  const slugEmail = stub.requesterEmail.replace(/[@.]/g, '_')
  const ts = new Date(stub.date).getTime()
  const bookingId = `${userId}_${slugEmail}_${ts}`
  const dateTs = Timestamp.fromDate(new Date(stub.date))

  // Upsert booking
  const ref = db.collection('bookings').doc(bookingId)
  const snap = await ref.get()
  if (!snap.exists) {
    await ref.set({
      providerId: userId,
      requesterName: stub.requesterName,
      requesterEmail: stub.requesterEmail,
      requesterPhone: stub.requesterPhone,
      date: dateTs,
      startTime: stub.startTime,
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
    console.log(`  ✔️ Added booking ${bookingId}`)
  } else {
    console.log(`  ↩️ Booking already exists: ${bookingId}`)
  }

  // Remove duplicates
  const dupSnap = await db
    .collection('bookings')
    .where('providerId', '==', userId)
    .where('requesterEmail', '==', stub.requesterEmail)
    .where('date', '==', dateTs)
    .where('startTime', '==', stub.startTime)
    .get()

  for (const doc of dupSnap.docs) {
    if (doc.id !== bookingId) {
      await db.collection('bookings').doc(doc.id).delete()
      console.log(`  🗑 Deleted duplicate booking ${doc.id}`)
    }
  }
}

async function seedBookings(seededProviders) {
  console.log('🌱 Upserting bookings…')
  for (const b of bookingStubs) {
    await upsertAndCleanBooking(b, seededProviders)
  }
}

// 6) Execute all
async function seedAll() {
  try {
    const seededProviders = await seedProviders()
    await cleanDuplicateProviders()
    await seedBookings(seededProviders)
    console.log('✅ All data seeded and cleaned successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding failed:', err)
    process.exit(1)
  }
}

seedAll()