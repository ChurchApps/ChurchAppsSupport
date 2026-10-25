import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Click-to-play YouTube embed: shows the video's thumbnail until clicked, then loads the
// privacy-enhanced player (captions off until the viewer turns on CC) and related videos limited to our channel.
// Optional next / nextUrl add a "Next video" link to the doc page for the next video in the series.
export default function YouTube({id, title, next, nextUrl}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    <figure className={styles.wrap}>
      <div className={styles.frame}>
        {playing ? (
          <iframe
            className={styles.player}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className={styles.poster} onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
            <img
              src={thumb}
              alt=""
              loading="lazy"
              onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            />
            <span className={styles.play} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="34" height="34"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </span>
          </button>
        )}
      </div>
      {(title || next) && (
        <figcaption className={styles.caption}>
          {title && (
            <span>
              {title} · <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
            </span>
          )}
          {next && nextUrl && (
            <Link className={styles.next} to={nextUrl}>
              Next video: {next} <span aria-hidden="true">→</span>
            </Link>
          )}
        </figcaption>
      )}
    </figure>
  );
}
