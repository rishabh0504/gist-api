import { useEffect, useState } from 'react';
import { getGist } from './api/gist-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileDetails from './components/FileDetails.component';

function App() {
  const [username, setUsername] = useState("");
  const [gists, setGists] = useState([]);

  useEffect(async () => {
    if (!!username) {
      const gistsDetail = await getGist(username);
      setGists(gistsDetail);
    }
  }, [username]);

  return (
    <div>

      {/* Header Part */}
      <div className='header theme-color'>
        Header
      </div>

      {/* Input container Part */}

      <div className="container filter mt-4 mb-4">
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search By Username..."
            value={username}
            onChange={e => setUsername(e.target.value)} />
        </div>
      </div>
      {
        gists && (
          gists.map((eachGist, index) => {
            return (
              <div className="container" key={index}>
                <div className="col-12 mt-3 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="col-6">
                        <ul>
                          {
                            eachGist && eachGist.files && (
                              Object.keys(eachGist.files).map((fileKey, index) => {
                                return (<li key={index}> {eachGist.files[fileKey].language} :{eachGist.files[fileKey].filename} </li>)
                              })
                            )
                          }
                        </ul>
                      </div>
                      <div className="col-6">
                        <FileDetails files={eachGist.files} id={eachGist.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )
      }
    </div>
  );
}

export default App;
