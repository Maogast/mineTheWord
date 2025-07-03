declare module 'firebase-admin' {
  interface ServiceAccount {
    projectId?: string;
    clientEmail?: string;
    privateKey?: string;
  }
}