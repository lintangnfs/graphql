
import Image from "next/image";

const Offline = () => {
  return (
    <>
      <div className="offline-page">
        <div>
          <div className="offline-image">
            <Image
              fill
              className="img-representative"
              src="/assets/illustration/offline.jpg"
              alt="Anime cover"
              loading="eager"
            />
          </div>
          <h1>You are offlie</h1>
          <p>Please connect to the internet</p>
        </div>
      </div>
      <style jsx>
        {`
          .offline-page {
            width: 100vw;
            height: 100vh;
            text-align: center;
          }
          .offline-image {
            position: relative;
            width: 80vw;
            height: 80vw;
          }
        `}
      </style>
    </>
  )
}

export default Offline;