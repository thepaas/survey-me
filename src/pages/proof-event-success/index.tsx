import successfullProofIcon from '@assets/images/successful-proof.png';
import { Header, Page } from '@components';

const ProofEventSuccess = () => {
  return (
    <Page>
      <Header />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          marginBottom: 32,
          padding: '1rem',
        }}
      >
        <img
          src={successfullProofIcon}
          alt='success'
          style={{
            height: 300,
            marginTop: '1rem',
            objectFit: 'contain',
            marginLeft: 30,
          }}
        />

        <p
          style={{
            fontSize: 24,
            marginTop: '2rem',
          }}
        >
          congratulations!
        </p>
        <p
          style={{
            fontSize: 24,
          }}
        >
          you're eligible for the survey
        </p>
      </div>
    </Page>
  );
};

export default ProofEventSuccess;
