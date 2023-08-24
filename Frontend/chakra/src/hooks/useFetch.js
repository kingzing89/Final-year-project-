import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext'
const useFetch = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const {user}=useAuthContext()
  const [tasks,setTask]=useState([])
  const url=`http://localhost:5000/api/order/getuorders/?user=${user.id}`
  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal, headers: { "Content-Type": "application/json" }, })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setTask(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      })
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return { tasks, isPending, error };
}
 
export default useFetch;