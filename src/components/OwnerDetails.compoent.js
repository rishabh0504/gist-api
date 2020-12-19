import { useEffect, useState } from "react";
import { getGistForked } from './../api/gist-api';

function OwnerDetails(props) {
  const [userCommit, setUserCommits] = useState([]);

  useEffect(async () => {
    const forkedData = await getGistForked(props.id);
    forkedData.sort((a, b) => {
      return new Date(b.committed_at) - new Date(a.committed_at);
    });
    const lastCommits = forkedData.splice(0, 3);
    setUserCommits(lastCommits);
  }, [props.id])
  return (
    <div className='col-12'>
      <p className='text-success'><b>Last forked users</b></p>
      <ul className="list-group">
        {
          userCommit && (
            userCommit.map((commits, index) => {
              return (
                <li className="list-group-item custom-font avatar-li" key={index}>
                  <div className="center">
                    <img src={commits.owner.avatar_url} className='avatar ml-3 mr-3' />
                  </div>
                  <div className="center mt-2">
                    <b>{commits.owner.login}</b>
                  </div>
                </li>
              )
            })
          )
        }
      </ul>

      {
        !userCommit.length > 0 && (
          <div className="col-12 no-forked">
            <h5 className="text-info text-center">Nobody forked..!!!</h5>
          </div>
        )
      }
    </div>
  )
}
export default OwnerDetails;
