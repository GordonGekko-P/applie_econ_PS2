import streamlit as st
import streamlit.components.v1 as components

# Configure the page
st.set_page_config(
    page_title="Econometrics Solutions",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS to match our React app's styling
st.markdown("""
    <style>
    .stApp {
        background-color: #000000;
        color: #ffffff;
    }
    .stMarkdown {
        color: #ffffff;
    }
    </style>
""", unsafe_allow_html=True)

# Title and description
st.title("Econometrics Solutions")
st.markdown("### Problem Set 2 Solutions with Multiple Style Implementations")

# Create tabs for different styles
tab1, tab2, tab3 = st.tabs(["Apple Style", "Palantir Style", "Pelgora Style"])

# Embed the React app
react_app_url = "https://gordongekko-p.github.io/applie_econ_PS2"

with tab1:
    st.markdown("### Apple-inspired Design")
    components.iframe(react_app_url, height=800, scrolling=True)

with tab2:
    st.markdown("### Palantir-inspired Design")
    components.iframe(react_app_url, height=800, scrolling=True)

with tab3:
    st.markdown("### Pelgora-inspired Design")
    components.iframe(react_app_url, height=800, scrolling=True)

# Sidebar with additional information
with st.sidebar:
    st.header("About")
    st.markdown("""
    This application provides solutions to Problem Set 2 with three different styling implementations:
    
    1. **Apple Style**: Clean, minimal, and elegant
    2. **Palantir Style**: Data-focused and professional
    3. **Pelgora Style**: Modern and dynamic
    
    Each implementation maintains the same content while demonstrating different approaches to UI/UX design.
    """)
    
    st.header("Navigation")
    st.markdown("""
    - Use the tabs above to switch between different style implementations
    - Each implementation includes all 5 tasks from Problem Set 2
    - Solutions include detailed explanations and mathematical formulas
    """)
    
    # Add a GitHub link
    st.markdown("---")
    st.markdown("[View on GitHub](https://github.com/GordonGekko-P/applie_econ_PS2)") 