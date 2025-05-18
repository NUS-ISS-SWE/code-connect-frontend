import images from "../assets/images";
import { ROLES } from "../constants/roles";
import paths from "../routes/paths";

const useContent = () => {
  const content = {
    accountVerified: {
      action: "Go to Login",
      image: images.verifiedImage,
      header: "Account Verified!",
      subheader:
        "Your account has been successfully verified. You can now log in and start exploring the platform.",
    },
    accountRegisterSuccess: {
      action: "Go to Home",
      image: images.wellDoneImage,
      header: "Thank you for registering!",
      subheader: {
        [ROLES.get("employee").value]:
          "A verification link has been sent to your email. Please check your inbox to complete the sign-up process.",
        [ROLES.get("employer").value]:
          "Your account is pending approval by an administrator. You will receive an email once your account is activated.",
      },
    },
    completeProfile: {
      action: "",
      image: images.completeProfileImage,
      header: "Complete Your Profile",
      subheader:
        "To get the most out of CodeConnect, please complete your profile.",
    },
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
    jobSuccess: {
      action: "Back to Job Listings",
      image: images.applySuccessImage,
      header: "Application Submitted!",
      subheader:
        "Thank you for applying. We’ll be in touch if your profile is shortlisted.",
    },
  };

  return content;
};

Object.freeze(useContent);

export default useContent;
