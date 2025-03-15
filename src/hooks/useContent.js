import images from "../assets/images";
import paths from "../routes/paths";

const useContent = () => {
  const content = {
    home: {
      hero: {
        background: images.heroBackground,
        header: "Empowering Developers, Bridging Talent and Opportunity.",
        subheader: "",
        actions: [
          { title: "Join Now", path: paths.get("SIGNUP").PATH },
          { title: "Explore Jobs", path: paths.get("JOBS").PATH },
        ],
      },
      features: {
        header: "Unlock Your Full Potential with CodeConnect",
        subheader:
          "Empowering developers with the right tools to find jobs, improve skills, and grow their careers. Explore our key features designed to help you succeed in the tech industry.",
        items: [
          {
            icon: "Briefcase",
            header: "Curated Job Listings",
            content:
              "Discover job opportunities tailored to your skills and experience. ",
          },
          {
            icon: "BarChart",
            header: "Skill Gap Analysis",
            content:
              "Identify areas for improvement with personalized insights.",
          },
          {
            icon: "Tools",
            header: "Interview Preparation",
            content:
              "Ace interviews with coding challenges, mock interview sessions, and real-world technical questions.",
          },
          {
            icon: "ShakeHands",
            header: "Professional Networking",
            content:
              "Connect with like-minded developers, mentors, and hiring managers.",
          },
        ],
      },
    },
    jobs: {
      head: {
        action: "Search",
        background: images.jobsBackground,
        header: "Find Your Next Tech Job",
        subheader:
          "Browse curated job listings tailored to your skills and experience.",
      },
    },
  };

  return content;
};

Object.freeze(useContent);

export default useContent;
