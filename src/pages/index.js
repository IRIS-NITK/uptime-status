/** @jsx jsx */
import { jsx } from "theme-ui"
import Loader from "react-loader-spinner";
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import * as icons from "../utils/icons"


class HelpCenterIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      serviceStatuses: null,
      globalStatus: false
    };
  }

  componentDidMount() {
    const service_ids = process.env.SERVICE_IDS.split(' ')
    Promise.all(service_ids.map(u => fetch(`${process.env.BASE_URL}${u}.json`))).then(responses =>
      Promise.all(responses.map(res => res.json()))
    ).then(serviceStatuses => {
      let globalStatus = serviceStatuses.every((serviceStatus) => serviceStatus.state == "up")
      this.setState({ isLoaded: true, serviceStatuses: serviceStatuses, globalStatus: globalStatus })

    })
    // , (error) => {
    //   this.setState({
    //     isLoaded: true,
    //     error
    //   });
    // }
  }
  render() {
    const { error, isLoaded, serviceStatuses, globalStatus } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <Layout
          location={this.props.location}
          title={this.props.data.site.siteMetadata.title}
          description={this.props.data.site.siteMetadata.description}
        >
          <SEO title={this.props.data.site.siteMetadata.title} skipSuffix />

          <div
            sx={{
              alignSelf: "center",
              justifySelf: "center"
            }}
          >
            <Loader
              type="ThreeDots"
              color="#00BFFF"
            />
          </div>
        </Layout>
      )
    } else {
      return (
        <Layout
          location={this.props.location}
          title={this.props.data.site.siteMetadata.title}
          description={this.props.data.site.siteMetadata.description}
        >
          <SEO title={this.props.data.site.siteMetadata.title} skipSuffix />
          {serviceStatuses.map((node) => {
            const state = node.state
            const icon = node.state === "up"
              ? jsx(
                icons['FaCheckCircle'],
                { sx: { color: "green" }, size: "2rem" },
                null
              )
              : jsx(
                icons['FaTimesCircle'],
                { sx: { color: "red" }, size: "2rem" },
                null
              )
            const last_checked_at = new Date(node.last_checked_at)
            const response_time_datetime = new Date(node.response_times.hour[node.response_times.hour.length - 1][0])
            return (
              <Link
                key={node.id}
                sx={{
                  boxShadow: `none`,
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              // to={node.fields.slug}
              >

                <article
                  sx={{
                    backgroundColor: "paperBackgroundColor",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "paperBorderColor",
                    borderRadius: 3,
                    py: 4,
                    px: 2,
                    position: "relative",
                    zIndex: "3",
                    textDecoration: "none",
                    overflow: "hidden",
                    width: "100%",
                    display: "flex",
                    flexDirection: ["column", "row"],
                    outline: "none",
                    mt: 0,
                    mb: 0,

                    boxShadow: "0 3px 8px 0 rgba(0,0,0,0.03)",
                    transition:
                      "border .15s linear, transform .15s linear, background-color .15s linear, box-shadow .15s linear, opacity .15s linear, transform .15s linear, box-shadow .15s linear",
                    color: "paperHeadingColor",
                    "&:hover": {
                      border: "1px solid rgba(136,149,162,0.2)",
                      backgroundColor: "paperHoverBackgroundColor",
                      color: "paperHoverHeadingColor",
                    },
                  }}
                >
                  <div
                    sx={{
                      flex: "1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: ["flex-start", "center"],
                      px: [2, 0],
                      pb: [3, 0],
                    }}
                  >
                    {/* place icon */}
                    {icon}
                  </div>
                  <div sx={{ flex: "6", px: [2, 0] }}>
                    <header>
                      <h3
                        sx={{
                          mt: 0,
                          mb: 2,
                          color: "inherit",
                        }}
                      >
                        {node.name}
                      </h3>
                    </header>
                    <section
                      sx={
                        node.state === "up" ? { color: "paperDescriptionColor" } : { color: "red" }
                      }
                    >

                      Availability: {Math.round(node.uptime.day[0].percent_up * 100) / 100}% (Checked at: {last_checked_at.toLocaleTimeString('en-IN', [], { hour: '2-digit', minute: '2-digit' })})

                  </section>
                    <section
                      sx={

                        node.state === "up" ? { color: "paperDescriptionColor" } : { color: "red" }
                      }
                    >

                      Response Time: {node.response_times.hour[node.response_times.hour.length - 1][1]} ms (Checked at {response_time_datetime.toLocaleTimeString('en-IN', [], { hour: '2-digit', minute: '2-digit' })})

</section>

                  </div>
                </article>
              </Link>
            )
          })
          }
        </Layout>
      )
    }
  }
}
export default HelpCenterIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description 
      }
    }
  }
`