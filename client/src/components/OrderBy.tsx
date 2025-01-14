import { MediaItemOrderBy, MediaType, SortOrder } from 'mediatracker-api';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useState } from 'react';

export const OrderByComponent: FunctionComponent<{
  orderBy: MediaItemOrderBy;
  setOrderBy: (value: MediaItemOrderBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (value: SortOrder) => void;
  mediaType?: MediaType;
}> = (props) => {
  const { orderBy, setOrderBy, sortOrder, setSortOrder, mediaType } = props;
  const [showSortByMenu, setShowSortByMenu] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        ref &&
        ref.current &&
        ref.current !== event.target &&
        !ref.current.contains(event.target)
      ) {
        setShowSortByMenu(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const mediaTypeOrderByString: Partial<Record<MediaItemOrderBy, string>> = {
    lastSeen: 'Last seen',
    releaseDate: 'Release date',
    status: 'Status',
    title: 'Title',
    ...(mediaType === 'tv'
      ? { nextAiring: 'Next airing', unseenEpisodes: 'Unseen episodes count' }
      : {}),

    ...(mediaType === undefined ? { mediaType: 'Media type' } : {}),
  };

  return (
    <div className="flex select-none">
      <div
        className="cursor-pointer"
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </div>
      <div
        className="relative ml-2 cursor-pointer select-none"
        ref={ref}
        onClick={() => setShowSortByMenu(!showSortByMenu)}
      >
        {mediaTypeOrderByString[orderBy]} ▼
        {showSortByMenu && (
          <ul className="absolute right-0 z-10 transition-all rounded shadow-lg shadow-black bg-zinc-100 dark:bg-gray-900">
            {Object.entries(mediaTypeOrderByString).map(
              ([value, text]: [MediaItemOrderBy, string]) => (
                <li
                  key={value}
                  className="px-2 py-1 rounded hover:bg-red-700 whitespace-nowrap"
                  onClick={() => setOrderBy(value)}
                >
                  {text}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
