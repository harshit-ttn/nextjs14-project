import Layout from "../components/Layout";
import WidgetBlock from "@components/WidgetBlock";
import "../styles/index.scss";

const contentList = [
  {
    heading: "DRM Contents",
    bgUrl:
      "https://i.pinimg.com/736x/61/45/51/6145514f3ca2de85d5a136413b6385f5.jpg",
  },
  {
    heading: "NON-DRM Contents",
    bgUrl:
      "https://i.pinimg.com/736x/53/e9/a0/53e9a0e84f1cfb7c93abb4119efe66e7.jpg",
  },
  {
    heading: "LIVE Contents",
    bgUrl:
      "https://i.pinimg.com/originals/4a/a8/7f/4aa87fb76e0355db7654985cde9677e8.jpg",
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="home-page">
        <div className="background-shapes">
          <div className="left-circle"></div>
          <div className="right-circle"></div>
          <div className="bottom-triangle"></div>
          <div className="upper-triangle"></div>
          <h1 className="content-title">Choose Your Favourite Content 😎</h1>
          <div className="widget-block-containers">
            {contentList.map((item, index) => (
              <WidgetBlock key={index} index={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
