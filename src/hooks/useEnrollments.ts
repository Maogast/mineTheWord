/*// src/hooks/useEnrollments.ts
import { useState, useEffect } from 'react';
import { auth, db } from '~/lib/firebaseClient';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

export function useEnrollments() {
  const [enrolls, setEnrolls] = useState<Enrollment[]>([]);
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const col = collection(db, 'users', uid, 'enrollments');
    return onSnapshot(col, (snap) =>
      setEnrolls(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);
  return enrolls;
}*/