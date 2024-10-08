import CreatePost from "./CreatePost";
import Explore from "./Explore";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Settings from "./Settings";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<Search />
			<Explore />
			<Notifications />
			<CreatePost />
			<ProfileLink />
			<Settings />
		</>
	);
};

export default SidebarItems;