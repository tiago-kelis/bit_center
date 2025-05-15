import { initializeApp, FirebaseApp } from "firebase/app"

// Verificar se as variáveis de ambiente estão definidas
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.error("ERRO: Variável de ambiente NEXT_PUBLIC_FIREBASE_API_KEY não está definida!");
}

if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
    console.error("ERRO: Variável de ambiente NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN não está definida!");
}

if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    console.error("ERRO: Variável de ambiente NEXT_PUBLIC_FIREBASE_PROJECT_ID não está definida!");
}

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // Adicione essas configurações se estiver usando esses recursos
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log("Firebase config (verificação):", {
    apiKeyExists: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomainExists: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectIdExists: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});

const app: FirebaseApp = initializeApp(firebaseConfig);

export { app }