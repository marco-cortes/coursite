import { EmptyList } from "../views/EmptyList";
import { CertCard } from "./CertCard";

export const CertList = ({ certs }) => {
  return (
    <>
      {
        certs.length > 0 ?
          <div className="course-list">
            {
              certs.map((cert, i) => (
                <CertCard cert={cert} key={i} />
              ))
            }
          </div> :
          <EmptyList />
      }
    </>
  )
}
