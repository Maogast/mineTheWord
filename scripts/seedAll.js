const admin = require('firebase-admin')
const path  = require('path')

// 0) Init Admin SDK
const serviceAccount = process.env.SERVICE_ACCOUNT_JSON
  ? JSON.parse(process.env.SERVICE_ACCOUNT_JSON)
  : require(path.resolve(__dirname, '../serviceAccountKey.json'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
const { Timestamp, FieldValue } = admin.firestore

// 1) Providers to seed
const providers = [
  {
    id: 'pastor-stephen-magare',
    userId: 'uid_pastor_steve',
    displayName: 'Pastor Stephen Magare',
    type: 'Pastor',
    subscribed: true,
    photoURL: 'https://example.com/photos/stephen.jpg',
    bio: 'I’ve been leading worship for over 10 years…',
    email: 'stevecr58@gmail.com',
  },
  {
    id: 'angels-choir',
    userId: 'uid_angels_choir',
    displayName: 'Angels Choir',
    type: 'Choir',
    subscribed: true,
    photoURL: 'https://example.com/photos/angels.jpg',
    bio: 'A dynamic choir from Nairobi…',
  },
  {
    id: 'mary-bible-student',
    userId: 'uid_mary_student',
    displayName: 'Mary Njeri',
    type: 'BibleStudent',
    subscribed: true,
    photoURL: 'https://example.com/photos/mary.jpg',
    bio: 'Bible student passionate about outreach…',
  },
]

// 2) Booking stubs (reference provider by slug)
const bookingStubs = [
  {
    providerSlug: 'pastor-stephen-magare',
    requesterName: 'Grace K.',
    requesterEmail: 'grace.k@example.com',
    requesterPhone: '+254700123456',
    date: '2025-08-05T10:00:00',
    startTime: '10:00',
  },
  {
    providerSlug: 'angels-choir',
    requesterName: 'Caleb M.',
    requesterEmail: 'caleb.m@example.com',
    requesterPhone: '+254711987654',
    date: '2025-08-07T17:00:00',
    startTime: '17:00',
  },
  {
    providerSlug: 'mary-bible-student',
    requesterName: 'Rachel N.',
    requesterEmail: 'rachel.n@example.com',
    requesterPhone: '+254722333444',
    date: '2025-08-10T14:30:00',
    startTime: '14:30',
  },
]

// Upsert providers
async function seedProviders() {
  console.log('🌱 Seeding providers…')
  for (const p of providers) {
    await db
      .collection('providers')
      .doc(p.id)
      .set({
        ...p,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    console.log(`  ✔️  ${p.displayName}`)
  }
}

// Create or update one booking stub, then remove any duplicates
async function upsertAndCleanBooking(stub) {
  const prov = providers.find((p) => p.id === stub.providerSlug)
  if (!prov) {
    console.warn(`  ⚠️ Unknown provider: ${stub.providerSlug}`)
    return
  }

  // build deterministic ID
  const slugEmail = stub.requesterEmail.replace(/[@.]/g, '_')
  const ts = new Date(stub.date).getTime()
  const bookingId = `${prov.userId}_${slugEmail}_${ts}`

  const dateTs = Timestamp.fromDate(new Date(stub.date))

  // 1) Create if missing
  const ref = db.collection('bookings').doc(bookingId)
  const snap = await ref.get()
  if (!snap.exists) {
    await ref.set({
      providerId: prov.userId,
      requesterName: stub.requesterName,
      requesterEmail: stub.requesterEmail,
      requesterPhone: stub.requesterPhone,
      date: dateTs,
      startTime: stub.startTime,
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
    console.log(`  ✔️  Added booking ${bookingId}`)
  } else {
    console.log(`  ↩️ Booking already exists: ${bookingId}`)
  }

  // 2) Delete any other docs matching the same key
  const dupSnap = await db
    .collection('bookings')
    .where('providerId', '==', prov.userId)
    .where('requesterEmail', '==', stub.requesterEmail)
    .where('date', '==', dateTs)
    .where('startTime', '==', stub.startTime)
    .get()

  for (const doc of dupSnap.docs) {
    if (doc.id !== bookingId) {
      await db.collection('bookings').doc(doc.id).delete()
      console.log(`  🗑  Deleted duplicate booking ${doc.id}`)
    }
  }
}

async function seedBookings() {
  console.log('🌱 Upserting bookings…')
  for (const b of bookingStubs) {
    await upsertAndCleanBooking(b)
  }
}

async function seedAll() {
  try {
    await seedProviders()
    await seedBookings()
    console.log('✅ All data seeded and cleaned successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding failed:', err)
    process.exit(1)
  }
}

seedAll()