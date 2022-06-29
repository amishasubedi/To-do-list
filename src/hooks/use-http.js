import { useState, useCallback } from "react";

const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          //"https://to-do-list-67ef1-default-rtdb.firebaseio.com/tasks.json"
          requestConfig.url,
          {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : "",
            body: requestConfig.body
              ? JSON.stringify(requestConfig.body)
              : null,
          }
        );

        // check for errors
        if (!response.ok) {
          throw new Error("Request failed!");
        }

        // transform data
        const data = await response.json();
        applyData(data);

        //   const loadedTasks = [];
        //   for (const taskKey in data) {
        //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        //   }
        //   setTasks(loadedTasks);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [requestConfig]
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
