import Image from 'next/image';

export default function Trademark() {
  return (
    <main className="w-full h-full flex justify-center">
      <div className="absolute bottom-1.5">
        <div className="flex justify-center items-center gap-1">
          <a href="http://instagram.com/chris_merino_">
            <Image
              src={'/Icons/IGICON.svg'}
              alt="Instagram"
              height={24}
              width={24}
            ></Image>
          </a>
          <p>App created by Chris Merino Dev</p>
        </div>
      </div>
    </main>
  );
}
