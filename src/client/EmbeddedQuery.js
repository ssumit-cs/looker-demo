/**
 * Created by Looker Data Applications Team
 * 2021
 */

import React, { useCallback, useEffect } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedQuery = () => {
  const [query, setQuery] = React.useState();

  const setupQuery = (query) => {
    setQuery(query);
  };

  useEffect(() => {
    const hostUrl = "https://pbl.looker.com";
    LookerEmbedSDK.init(hostUrl, "/api/auth");
  }, []);

  let queryUrl =
    "/embed/query/atom_fashion/order_items?fields=order_items.created_time,users.name,order_items.total_sale_price,users.approx_location,users.city&f[users.country]=USA&sorts=order_items.created_time+desc&limit=100&query_timezone=America%2FLos_Angeles&vis=%7B%22map_plot_mode%22%3A%22points%22%2C%22heatmap_gridlines%22%3Afalse%2C%22heatmap_gridlines_empty%22%3Afalse%2C%22heatmap_opacity%22%3A0.5%2C%22show_region_field%22%3Atrue%2C%22draw_map_labels_above_data%22%3Atrue%2C%22map_tile_provider%22%3A%22traffic_day%22%2C%22map_position%22%3A%22custom%22%2C%22map_scale_indicator%22%3A%22off%22%2C%22map_pannable%22%3Atrue%2C%22map_zoomable%22%3Atrue%2C%22map_marker_type%22%3A%22circle%22%2C%22map_marker_icon_name%22%3A%22shopping_cart%22%2C%22map_marker_radius_mode%22%3A%22proportional_value%22%2C%22map_marker_units%22%3A%22pixels%22%2C%22map_marker_proportional_scale_type%22%3A%22linear%22%2C%22map_marker_color_mode%22%3A%22fixed%22%2C%22show_view_names%22%3Afalse%2C%22show_legend%22%3Atrue%2C%22quantize_map_value_colors%22%3Afalse%2C%22reverse_map_value_colors%22%3Afalse%2C%22map_latitude%22%3A40.267214274019075%2C%22map_longitude%22%3A-94.70352172851564%2C%22map_zoom%22%3A4%2C%22map_marker_color%22%3A%5B%22%234595EC%22%5D%2C%22series_types%22%3A%7B%7D%2C%22type%22%3A%22looker_map%22%2C%22defaults_version%22%3A1%2C%22hidden_fields%22%3A%5B%22users.name%22%2C%22order_items.created_time%22%5D%7D&filter_config={}&origin=share-expanded&sdk=2&embed_domain=";
  let encodedQueryUrl = encodeURIComponent(
    `${queryUrl}${document.location.origin}`
  );

  const embedCtrRef = useCallback(async (el) => {
    if (el) {
      el.innerHTML = "";
      let returnObj = await fetch(`/api/auth?src=${encodedQueryUrl}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          LookerEmbedSDK.createExploreWithUrl(data.url)
            .appendTo(el)
            .build()
            .connect()
            .then(setupQuery)
            .catch((error) => {
              console.error("Connection error", error);
            });
        })
        .catch((e) => {
          console.log({ e });
        });
      return returnObj;
    }
  }, []);

  return (
    <>
      <EmbedContainer ref={embedCtrRef} />
    </>
  );
};

export default EmbeddedQuery;
