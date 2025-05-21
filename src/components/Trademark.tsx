import Image from 'next/image';

export default function Trademark() {
  return (
    <main className="bg-stone-50 w-screen flex justify-center">
      <div className="sticky bottom-1">
        <div className="flex items-center gap-1">
          <a href="http://instagram.com/chris_merino_">
            <Image
              src={'/Icons/IGICON.svg'}
              alt="Instagram"
              height={24}
              width={24}
            ></Image>
          </a>
          <p>App created by Chris Merino</p>
        </div>
      </div>
    </main>
  );
}
