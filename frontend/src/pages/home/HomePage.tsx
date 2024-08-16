import Posts from '../../components/common/Posts';
import CreatePost from './CreatePost';
import TabsList from './TabsList';

function HomePage() {
    return (
        <div className="min-h-screen border-r border-neutral">
            <TabsList />
            <CreatePost />
            <Posts />
        </div>
    );
}

export default HomePage;
