import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  Divider,
  Skeleton,
  Chip,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Product } from "../../mocks/product/product";
import { safeApi } from "../../services/api";
import { pages } from "../../router/pages";
import { SafeAppBar } from "../../shared-components/SafeAppBar";

export function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const { data } = await safeApi.get<Product>(`products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <Stack spacing={4}>
            {/* Top navigation */}
            <Box>
              <Button
                startIcon={<HomeIcon />}
                onClick={() => navigate(pages.products)}
                variant="text"
              >
                Back to products
              </Button>
            </Box>

            <Divider />

            {/* Main content */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
              {/* Image */}
              <Box
                sx={{
                  width: { xs: "100%", md: 260 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <Skeleton variant="rectangular" width={240} height={240} />
                ) : (
                  <Box
                    component="img"
                    src={product?.image}
                    alt={product?.title}
                    sx={{
                      width: 240,
                      height: 240,
                      objectFit: "contain",
                      borderRadius: 2,
                    }}
                  />
                )}
              </Box>

              {/* Details */}
              <Stack spacing={2} flex={1}>
                {loading ? (
                  <>
                    <Skeleton width="70%" height={36} />
                    <Skeleton width="40%" />
                    <Skeleton width="100%" height={80} />
                  </>
                ) : (
                  <>
                    <Typography variant="h5" fontWeight={600}>
                      {product?.title}
                    </Typography>

                    <Typography variant="h6" color="primary">
                      ${product?.price.toFixed(2)}
                    </Typography>

                    <Chip
                      label={product?.category}
                      size="small"
                      sx={{ alignSelf: "flex-start" }}
                    />

                    <Typography color="text.secondary">
                      {product?.description}
                    </Typography>

                    <Divider />

                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingCartIcon />}
                      sx={{ alignSelf: "flex-start" }}
                    >
                      Buy now
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
