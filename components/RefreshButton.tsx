import { useState } from "react";

const RefreshButton = () => {
    const [loading, setLoading] = useState(false)
    const handleClick = async (e: { preventDefault: () => void; }) => {
        setLoading(true);
        e.preventDefault();
        await fetch('http://localhost:3000/api/refresh-shops', {
            method: 'POST'
        })
        setLoading(false);
        location.reload();
      }
    
      return (
        <button onClick={handleClick}>
          {loading? "Loading..." : "Click to Refresh Data"}
        </button>
      );
}

export default RefreshButton