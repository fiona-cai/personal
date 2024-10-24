import { LinkedInEmbed } from 'react-social-media-embed';


export default function Home({ linkedInPosts }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LinkedInEmbed 
        url="https://www.linkedin.com/embed/feed/update/urn:li:share:6898694772484112384"
        postUrl="https://www.linkedin.com/posts/peterdiamandis_5-discoveries-the-james-webb-telescope-will-activity-6898694773406875648-z-D7"
        width={325}
        height={570} 
      />
    </div>
  );
}
