import {useState, useCallback} from 'react';

const usePost = (action, onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const post = useCallback(async () => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);

      const res = await action();
      setIsLoading(false);
      if (res && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error, JSON.parse(error));
      setIsLoading(false);
    }
  }, [action, onSuccess]);

  return {isLoading, post};
};

export default usePost;
