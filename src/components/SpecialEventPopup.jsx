import { useEffect, useState } from "react";

function SpecialEventPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const today = new Date();
    const todayDate = today.getDate(); // 1–31

    const EVENT_DAY = 7; // Sakraman Pooja day

    if (todayDate === EVENT_DAY) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center relative">

        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-amber-700 mb-3">
          Special Event Today
        </h2>

        <p className="text-gray-700 mb-4">
          Today is the sacred Sakraman Pooja in honor of Swami Koragajja.
          Devotees may submit their Harake and seek divine blessings.
        </p>

        <button
          onClick={() => setShow(false)}
          className="bg-amber-600 text-white px-5 py-2  rounded-lg"
        >
          Okay
        </button>

      </div>
    </div>
  );
}

export default SpecialEventPopup;
