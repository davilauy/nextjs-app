import { useState, useEffect } from "react"

import AppLayout from "components/AppLayout"
import Devit from "components/Devit"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  console.log(timeline)
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(({ id, avatar, name, message, username }) => {
            return (
              <Devit
                key={id}
                avatar={avatar}
                id={id}
                message={message}
                name={name}
                username={username}
              />
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
