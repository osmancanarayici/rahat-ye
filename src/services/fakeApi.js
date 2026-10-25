// Gerçek sunucu yok: 1.5 sn bekler, %10 ihtimalle hata verir.
export function submitMealToServer(meal) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Sunucu hatası'));
      } else {
        resolve({ ok: true });
      }
    }, 1500);
  });
}