import { useEffect, useRef, useState } from 'react';

const tabsData = [
  {
    label: 'All',
  },
  {
    label: 'Liked',
  },
];

export function Tabs({ setCategory }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  return (
    <div>
      <div className="relative">
        <div className="flex space-x-8">
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                ref={(el) => (tabsRef.current[idx] = el)}
                className="p-3 hover:text-gray-400 text-white"
                onClick={() => {
                  setActiveTabIndex(idx);
                  setCategory(tab.label);
                }}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <span
          className="rounded-full absolute bottom-0 block h-1 bg-purple-500 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
    </div >
  );
}
