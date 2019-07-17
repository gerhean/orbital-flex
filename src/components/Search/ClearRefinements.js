import { connectCurrentRefinements } from 'react-instantsearch-native';

const ClearRefinements = ({ items, refine }) => (
    <button onClick={() => refine(items)} disabled={!items.length}>
      Clear filters
    </button>
  );
  
export default connectedClearRefinements = connectCurrentRefinements(ClearRefinements);