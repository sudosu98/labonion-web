export default function Section() {

  return (
    <div
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative z-10 p-20 mix-blend-difference text-black w-full h-full flex flex-col justify-between">
        <p className="w-[50vw] text-[2vw] self-end uppercase mix-blend-difference">
          Upload a book and share it with your friends/colleagues by adding them to a space.
        </p>
        <p className="text-[5vw] uppercase mix-blend-difference">
          Build Community
        </p>
      </div>
    </div>
  );
}
