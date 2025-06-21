export const getSearchResult = async (accessToken: string | null, value: string | null) => {
    try {
      const params = new URLSearchParams({
        q: value,
        type: "album,track,playlist,artist,show",
        limit: 20
      }) 
        
      const response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error("Error getting track: ", error);
    }
  };