import createDOMPurify from 'dompurify';
import nlt from '../apis/nlt';
import { types } from '../types/types';

const DOMPurify = createDOMPurify(window);

export const getRandomPsalm =
  (version = 'NLT') =>
  async dispatch => {
    const random = Math.floor(Math.random() * 151);
    const { data } = await nlt.get('/passages', {
      params: { ref: `Psalms.${random}` },
      version,
    });

    dispatch({
      type: types.GET_RANDOM_PSALM,
      payload: {
        html: DOMPurify.sanitize(data),
        psalmNumber: random,
      },
    });
  };
