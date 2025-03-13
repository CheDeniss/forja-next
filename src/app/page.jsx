import { redirect } from 'next/navigation';

export default function Home() {
  // За замовчуванням перенаправляємо на англійську
  redirect('/en');
}
