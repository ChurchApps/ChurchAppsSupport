import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Click-to-play YouTube embed: shows the video's thumbnail until clicked, then loads the
// privacy-enhanced player (captions off until the viewer turns on CC) and related videos limited to our channel.
// Optional next / nextUrl add a "Next video" link to the doc page for the next video in the series.

// YouTube turns uploaded captions on by itself in embeds (cc_load_policy and unloadModule at load
// don't stop it), so switch them off once, when playback first starts. Viewers can still press CC.
let apiPromise;
function loadYouTubeApi() {
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      if (window.YT && window.YT.Player) return resolve(window.YT);
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previous) previous();
        resolve(window.YT);
      };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    });
  }
  return apiPromise;
}

export default function YouTube({id, title, next, nextUrl}) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!playing || !iframeRef.current) return undefined;
    let player;
    let captionsHandled = false;
    loadYouTubeApi().then((YT) => {
      if (!iframeRef.current) return;
      player = new YT.Player(iframeRef.current, {
        events: {
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING && !captionsHandled) {
              captionsHandled = true;
              e.target.setOption('captions', 'track', {});
              e.target.unloadModule('captions');
            }
          },
        },
      });
    });
    return () => {
      if (player && player.destroy) player.destroy();
    };
  }, [playing]);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    <figure className={styles.wrap}>
      <div className={styles.frame}>
        {playing ? (
          <iframe
            ref={iframeRef}
            className={styles.player}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
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
