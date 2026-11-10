import Image from "next/image";
import Link from "next/link";

/** Оригінальний векторний знак: тарілка та паросток. Назву проєкту збережено. */
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Food app — головна">
      <Image
        src="/brand/logo-mark.svg"
        alt=""
        width={46}
        height={46}
        priority
      />
      <span>
        food<span className="brand-dot">.</span>app
        {!compact && <small>смачно бути вдома</small>}
      </span>
    </Link>
  );
}
