import React, { useEffect, useState } from 'react';

import { userService } from '../../../services';


function History() {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    const res = await userService.getUserHistory();
    console.log(res.data)
    setHistoryList(res.data);
  }

  return (
    <div>
      <h1>Historico</h1>
      <ul>
        {historyList.map(history => (
          <li key={history.id}>{history.user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default History
