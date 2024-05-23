// src/app/components/Navbar.js

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/Forgottens">
            Forgottens
          </Link>
        </li>
        <li>
          <Link href="/Holdback">
            Holdbacks
          </Link>
        </li>
      </ul>
    </nav>
  );
}
