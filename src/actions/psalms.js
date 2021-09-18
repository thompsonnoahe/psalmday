import createDOMPurify from 'dompurify';
import esv from '../apis/esv';
import nlt from '../apis/nlt';
import { types } from '../types/types';

const DOMPurify = createDOMPurify(window);

export const getRandomPsalm =
  (version = 'NLT') =>
  async dispatch => {
    const random = Math.floor(Math.random() * 150) + 1;
    if (version === 'NLT') {
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
    } else if (version === 'ESV') {
      const { data } = await esv.get('/html', {
        params: {
          q: `Psalms+${random}`,
        },
      });
      dispatch({
        type: types.GET_RANDOM_PSALM,
        payload: {
          html: DOMPurify.sanitize(data.passages),
          psalmNumber: random,
        },
      });
    } else {
      return;
    }
  };
