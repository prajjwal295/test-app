# Facebook Page Insights Fetcher

This application allows you to fetch and display Facebook Page insights using the Facebook Graph API. It retrieves metrics like page impressions, fans, post engagements, and reactions for a selected page in React.

## Features

Facebook OAuth Login

Displays logged-in user's profile information

Lists pages owned by the user

Fetches and displays insights metrics for a selected page


## Code Structure

### Home Component:

Handles user authentication, fetches and displays pages the user manages.
Provides a dropdown to select a page and renders the Page component.

### Page Component:

Fetches insights data for the selected page using the Facebook Graph API.
Displays metrics including impressions, fans, engagements, and reactio

### Login Component:

Handles Facebook OAuth login.
Authenticates the user and retrieves an access token.

