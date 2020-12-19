import { useEffect, useState } from "react";
import { getGistForked } from './../api/gist-api';
import moment from 'moment'


function OwnerDetails(props) {
  const [id, setId] = useState('');
  const [userCommit, setUserCommits] = useState([]);

  useEffect(async () => {
    const forkedData = await getGistForked(props.id);
    forkedData.sort((a, b) => {
      return new Date(b.committed_at) - new Date(a.committed_at);
    });
    // Get 3 last commits
    const lastCommits = forkedData.splice(0, 3);
    setUserCommits(lastCommits);
  }, [props.id])
  return (
    <div className='col-12'>
      <ul className="list-group list-group-flush">
        {
          userCommit && (
            userCommit.map((commits, index) => {
              return (
                <li className="list-group-item custom-font" key={index}><b>Modified By :</b>  <img src={commits.user.avatar_url} className='avatar ml-3 mr-3' /> <b>{commits.user.login}</b> </li>
              )
            })
          )
        }
      </ul>
    </div>
  )
}
export default OwnerDetails;
