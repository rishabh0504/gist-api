import { useEffect, useState } from "react";
import { getGistForked } from './../api/gist-api';


function FileDetails(props) {
    const [languages, setLanguages] = useState({});
    const [id, setId] = useState('');
    useEffect(() => {
        const foundLanguages = [];
        const foundFilesMapping = {};
        Object.keys(props.files).map((fileKey, index) => {
            if (foundLanguages.includes(props.files[fileKey].language)) {
                foundFilesMapping[props.files[fileKey].language].push(props.files[fileKey].filename)
            } else {
                foundLanguages.push(props.files[fileKey].language)
                foundFilesMapping[props.files[fileKey].language] = [props.files[fileKey].filename]
            }
        })
        setLanguages(foundFilesMapping);
    }, [props.files]);

    useEffect(async () => {
        const forkedData = await getGistForked(id);
        // Couldn't 
        // console.log('forkedData', forkedData);
    }, [props.id])
    return (
        <div >
            <ul>
                {
                    languages && (
                        Object.keys(languages).map((keyItem, index) => {
                            return (
                                <li key={index}>{keyItem} : {languages[keyItem].join(', ')} </li>
                            )
                        })
                    )
                }
            </ul>
        </div>
    )
}
export default FileDetails;
