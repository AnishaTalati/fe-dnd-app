export const sortReviews = async (query = "") => {
  const [sortedReviews, setSortedReviews] = useState([]);

  const getSortedReviews = (query) => {
    const { data } = await reviewsApi.get(`/reviews?${query}`);
    return data.reviews;
  };

  useEffect(() => {
    getSortedReviews(query).then((response) => {
      setSortedReviews(response);
    });
  }, [query]);

  return sortedReviews;
};
