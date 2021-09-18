import React from 'react';
import { withRouter } from 'react-router-dom';
import esv from '../../apis/esv';
import nlt from '../../apis/nlt';
import createDOMPurify from 'dompurify';

const DOMPurify = createDOMPurify(window);

class PsalmDetail extends React.Component {
  state = { psalm: '' };

  async getPsalm(version) {
    const { chapter } = this.props.match.params;
    if (version === 'NLT') {
      const { data } = await nlt.get('/passages', {
        params: { ref: `Psalms.${chapter}` },
        version,
      });
      this.setState({ psalm: DOMPurify.sanitize(data) });
    } else if (version === 'ESV') {
      const { data } = await esv.get('/html', {
        params: {
          q: `Psalms+${chapter}`,
        },
      });
      this.setState({ psalm: DOMPurify.sanitize(data.passages) });
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.getPsalm('NLT');
  }

  render() {
    return (
      <div className='flex items-center justify-center mt-5 p-10'>
        <div
          className={`${this.props.version === 'ESV' ? 'p-5' : ''}`}
          dangerouslySetInnerHTML={{
            __html: this.state.psalm,
          }}></div>
      </div>
    );
  }
}

export default withRouter(PsalmDetail);
