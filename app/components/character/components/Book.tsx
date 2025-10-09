'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Book.module.css';

export interface Page {
  content: React.ReactNode;
  pageNumber: number;
}

export interface Bookmark {
  label: string;
  pageNumber: number;
  color: string;
}

export interface BookProps {
  title: string;
  author: string;
  pages: Page[];
  bookmarks?: Bookmark[];
  width?: number;
  height?: number;
  onPageChange?: (pageNumber: number) => void; // 👈 Add this line
}


export const Book: React.FC<BookProps> = ({
  title,
  author,
  pages,
  width = 900,
  height = 600,
  bookmarks = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextSpread, setNextSpread] = useState<number | null>(null);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right' | null>(null);
  const [hideContent, setHideContent] = useState(false);

  const totalSpreads = Math.ceil(pages.length / 2);
  const leftPageIndex = currentSpread * 2;
  const rightPageIndex = leftPageIndex + 1;

  const handleOpen = () => {
    setIsAnimating(true);
    setIsOpen(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setCurrentSpread(0);
    }, 1200);
  };

  const calculateSpreadFromPage = (pageNumber: number) => {
    return Math.floor((pageNumber - 1) / 2);
  };

  const handleBookmarkClick = async (pageNumber: number) => {
    if (isFlipping) return;
    const targetSpread = calculateSpreadFromPage(pageNumber);
    if (targetSpread === currentSpread) return;

    setIsFlipping(true);
    setHideContent(true);
    const direction = targetSpread > currentSpread ? 'left' : 'right';
    setFlipDirection(direction);
    setNextSpread(targetSpread);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCurrentSpread(targetSpread);
    setHideContent(false);
    setIsFlipping(false);
    setFlipDirection(null);
    setNextSpread(null);
  };

  const renderPage = (pageIndex: number) => {
    return (
      pages[pageIndex]?.content || (
        <div className={styles.emptyPage}>
          <p>This page is intentionally left blank</p>
        </div>
      )
    );
  };

  const renderBookmarks = () => (
    <div className={styles.bookmarks}>
      {bookmarks.map((bookmark, index) => (
        <div
          key={index}
          className={styles.bookmark}
          style={{ '--bookmark-color': bookmark.color } as React.CSSProperties}
          onClick={() => handleBookmarkClick(bookmark.pageNumber)}
        >
          {bookmark.label}
        </div>
      ))}
    </div>
  );

  const turnPage = useCallback(
    (direction: 'next' | 'prev') => {
      if (isFlipping) return;

      setIsFlipping(true);
      setHideContent(true);

      const newSpread = direction === 'next' ? currentSpread + 1 : currentSpread - 1;

      if (
        (direction === 'next' && currentSpread < totalSpreads - 1) ||
        (direction === 'prev' && currentSpread > 0)
      ) {
        setNextSpread(newSpread);
        setFlipDirection(direction === 'next' ? 'left' : 'right');

        setTimeout(() => {
          setCurrentSpread(newSpread);
          setNextSpread(null);
          setHideContent(false);
          setIsFlipping(false);
          setFlipDirection(null);
        }, 1200);
      } else {
        setHideContent(false);
        setIsFlipping(false);
      }
    },
    [currentSpread, isFlipping, totalSpreads]
  );

  const handleKeyClick = (action: 'prev' | 'next' | 'close') => {
    switch (action) {
      case 'prev':
        if (!isFlipping && currentSpread > 0) {
          turnPage('prev');
        }
        break;
      case 'next':
        if (!isFlipping && currentSpread < totalSpreads - 1) {
          turnPage('next');
        }
        break;
      case 'close':
        handleClose();
        break;
    }
  };

  const renderKeyControls = () => (
    <div className={styles.keyControls}>
      <div
        className={`${styles.keyGroup} ${currentSpread === 0 ? styles.disabled : ''}`}
        onClick={() => handleKeyClick('prev')}
      >
        <div className={styles.keyBox}>←</div>
        <span>Previous Page</span>
      </div>
      <div
        className={`${styles.keyGroup} ${currentSpread >= totalSpreads - 1 ? styles.disabled : ''}`}
        onClick={() => handleKeyClick('next')}
      >
        <div className={styles.keyBox}>→</div>
        <span>Next Page</span>
      </div>
      <div className={styles.keyGroup} onClick={() => handleKeyClick('close')}>
        <div className={styles.keyBox}>Esc</div>
        <span>Close Book</span>
      </div>
    </div>
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isOpen || isFlipping || isClosing) return;

      switch (event.key) {
        case 'ArrowRight':
          if (currentSpread < totalSpreads - 1) turnPage('next');
          break;
        case 'ArrowLeft':
          if (currentSpread > 0) turnPage('prev');
          break;
        case 'Escape':
          handleClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, isFlipping, isClosing, currentSpread, totalSpreads, turnPage]);

  if (!isOpen) {
    return (
      <div className={styles.bookContainer}>
        <div
          className={`${styles.book} ${styles.closed} ${isAnimating ? styles.animating : ''}`}
          onClick={handleOpen}
          style={{ width: isAnimating ? width : 300, height: isAnimating ? height : 400 }}
        >
          <div className={styles.cover}>
            <h1>{title}</h1>
            <h2>{author}</h2>
          </div>
          <div className={styles.spine}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bookContainer}>
      <div className={`${styles.book} ${styles.open} ${isAnimating ? styles.animating : ''}`} style={{ width, height }}>
        {renderBookmarks()}

        {/* Left page */}
        <div
          className={`${styles.page} ${styles.leftPage} ${isFlipping && flipDirection === 'right' ? styles.flipLeftToRight : ''}`}
        >
          <div className={`${styles.pageContent} ${hideContent ? styles.hideContent : ''}`}>
            {renderPage(leftPageIndex)}
            <div className={styles.pageNumber}>{leftPageIndex + 1}</div>
          </div>
        </div>

        {/* Right page */}
        <div
          className={`${styles.page} ${styles.rightPage} ${isFlipping && flipDirection === 'left' ? styles.flipRightToLeft : ''}`}
        >
          <div className={`${styles.pageContent} ${hideContent ? styles.hideContent : ''}`}>
            {renderPage(rightPageIndex)}
            <div className={styles.pageNumber}>{rightPageIndex + 1}</div>
          </div>
        </div>

        {/* Background flipping pages */}
        {isFlipping && nextSpread !== null && (
          <>
            <div
              className={`${styles.page} ${styles.leftPage}`}
              style={{ position: 'absolute', left: 0, zIndex: flipDirection === 'right' ? 99 : 97 }}
            >
              <div className={`${styles.pageContent} ${styles.hideContent}`}>
                {renderPage(nextSpread * 2)}
                <div className={styles.pageNumber}>{nextSpread * 2 + 1}</div>
              </div>
            </div>
            <div
              className={`${styles.page} ${styles.rightPage}`}
              style={{ position: 'absolute', right: 0, zIndex: flipDirection === 'left' ? 98 : 96 }}
            >
              <div className={`${styles.pageContent} ${styles.hideContent}`}>
                {renderPage(nextSpread * 2 + 1)}
                <div className={styles.pageNumber}>{nextSpread * 2 + 2}</div>
              </div>
            </div>
          </>
        )}

        {/* Page nav buttons */}
        <>
          {/* <button
            className={`${styles.pageButton} ${styles.prevButton}`}
            onClick={() => turnPage('prev')}
            disabled={currentSpread === 0 || isFlipping}
          >
            ←
          </button>
          <button
            className={`${styles.pageButton} ${styles.nextButton}`}
            onClick={() => turnPage('next')}
            disabled={currentSpread >= totalSpreads - 1 || isFlipping}
          >
            →
          </button> */}
        </>
      </div>

      {/* Bottom controls */}
      <>
        <button className={styles.closeButton} onClick={handleClose}>
          Close Book
        </button>
        {renderKeyControls()}
      </>
    </div>
  );
};

export default Book;
/* */