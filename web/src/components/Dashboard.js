import React, { useEffect, useState } from 'react'



function Dashboard() {
  const [version, setVersion] = useState("0")
  useEffect(() => {
    getChromeVersion();
  
  }, []);

  const getChromeVersion = async () => {
    let version = await window.versions.chrome();
    setVersion(version);
  }
  
  return (
    <div><h2>Dashboard</h2>
    This app is using Chrome v{version},
    </div>
  )
}

export default Dashboard