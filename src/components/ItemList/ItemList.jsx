import Grid from "@mui/material/Grid"
import Item from "../Item/Item"

const ItemList = ({ products }) => {
  return (
    <Grid container spacing={3}>
      {products.map(prod => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={prod.id}>
          <Item {...prod} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ItemList
