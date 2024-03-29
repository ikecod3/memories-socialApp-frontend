# memories-socialApp-frontend

## Frontend Configuration

### The frontend phase is built on React.js. The project primarily uses:

- React Redux Toolkit: For efficient Redux development and state management.
- React Hooks: To manage and extract stateful logic for reusability.
- React Icons: For integrating a variety of icons.
- Tailwind CSS: For styling.
- React Router DOM: For managing page route navigation.
- Bar-of-progress: For loading bar animation
- Ant Design: For enhanced reusability of features and user-friendly interactions.

### Folder Structure:

- components: contains reusable UI components.
- layout: Houses the AppLayout for the entire web app.
- pages: Includes different pages such as login, register, profile, homepage, and reset password.
- reduxSlice: Holds Redux slices for post, user, and theme.
- utils: Contains utility/resuable functions.

### Components houses:

- TextInput
- CustomButton
- AdvertCard
- CommentForm
- FriendCard
- EditProfile
- ReplyCard
- NavBar
- Loading
- PopupConfirmation

### Layout

- AppLayout: Layout for the entire web app.

### Pages

- Login
- Register
- Profile
- Homepage
- Reset Password

### ReduxSlice/Store houses

- PostSlice
- UserSlice
- ThemeSlice

## Main Features

#### Registration: A user interface for user registration.

#### Login: An Interface that accepts verified login credentials.

#### Home Page: Accessible after successful login

- Includes a navbar.
- Profile card.
- Friend-list card.
- Friend-request card.
- Sponsored-ad card.

#### Forgot Password: Allows users to request and reset their forgotten password.

#### Navbar: Contains the logo theme, toggler, and logout button.

#### Profile Card:

- Displays user information, including profile image, profession, location, and profile view count.
- Allows editing and saving of profile information.
- Clicking on a username in a post allows viewing that user's profile.

#### Post Creation:

- Supports text and multimedia posts
- Media has a max-size of 5MB.

#### Post Deletion: Users can delete their own posts.

#### Post Like and Comment: Users can like, unlike, and comment on various posts.

#### Post Searching: Users can filter/search for posts using keywords.

#### Light/Dark Mode Preference:

Users can switch between light and dark theme modes and their preferred theme is set persistently.
