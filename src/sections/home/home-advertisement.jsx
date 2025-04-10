import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function HomeAdvertisement({ sx, ...other }) {
  return (
    <Box
      component="section"
      sx={[{ position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <MotionViewport>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 3, // Adjust spacing between boxes
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Container key={index} sx={{ position: 'relative', zIndex: 9 }}>
              <Box
                sx={(theme) => ({
                  ...theme.mixins.bgGradient({
                    images: [
                      `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
                      `linear-gradient(90deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
                    ],
                    sizes: ['36px 36px'],
                    repeats: ['repeat'],
                  }),
                  py: 8,
                  px: 5,
                  spacing: 5,
                  borderRadius: 3,
                  display: 'flex',
                  overflow: 'hidden',
                  bgcolor: 'grey.900',
                  position: 'relative',
                  alignItems: 'center',
                  textAlign: { xs: 'center', md: 'left' },
                  flexDirection: { xs: 'column', md: 'row' },
                  border: `solid 1px ${theme.vars.palette.grey[800]}`,
                })}
              >
                {renderImage()}
                {renderDescription()}
                {renderBlur()}
              </Box>
            </Container>
          ))}
        </Box>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------
const cards = [
  {
    id: 1,
    title: 'NextShe',
    subtitle: 'Innovation',
    description: 'Empowering businesses through trade development initiatives',
    primaryLink: paths.minimalStore,
    primaryButtonText: 'Learn More',
    secondaryLink: paths.nextShe,
    secondaryButtonText: 'Get Started',
    image: `${CONFIG.assetsDir}/assets/illustrations/illustration-1.webp`,
  },
  {
    id: 2,
    title: 'Eagles Nest',
    subtitle: 'Solutions',
    description: 'Opening new markets for Zimbabwean businesses',
    primaryLink: paths.minimalStore,
    primaryButtonText: 'Explore Markets',
    secondaryLink: paths.about,
    secondaryButtonText: 'Join Now',
    image: `${CONFIG.assetsDir}/assets/illustrations/illustration-2.webp`,
  },
  {
    id: 3,
    title: 'Clusters',
    subtitle: 'Strategy',
    description: 'Accelerating export growth and market expansion',
    primaryLink: paths.minimalStore,
    primaryButtonText: 'View Services',
    secondaryLink: paths.about,
    secondaryButtonText: 'Contact Us',
    image: `${CONFIG.assetsDir}/assets/illustrations/illustration-3.webp`,
  },
  {
    id: 4,
    title: 'Trade Development',
    subtitle: 'Network',
    description: 'Supporting businesses in international trade',
    primaryLink: paths.minimalStore,
    primaryButtonText: 'Join Network',
    secondaryLink: paths.about,
    secondaryButtonText: 'Learn More',
    image: `${CONFIG.assetsDir}/assets/illustrations/illustration-4.webp`,
  },
];

export function CircularMotionCards() {
  return (
    <MotionViewport>
      <Box
        component={m.div}
        sx={{
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <Box
          component={m.div}
          initial={{ x: 0 }}
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'circInOut',
          }}
          sx={{
            display: 'flex',
            width: '400%',
            gap:1,
          }}
        >
          {cards.map((card) => (
            <Container
              key={card.id}
              sx={{
                flex: '0 0 calc(100% - 8px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={(theme) => ({
                  ...theme.mixins.bgGradient({
                    images: [
                      `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
                      `linear-gradient(90deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
                    ],
                    sizes: ['24px 24px'], // Reduced grid size
                    repeats: ['repeat'],
                  }),
                  py: 6, // Reduced vertical padding
                  px: 4, // Reduced horizontal padding
                  spacing: 3, // Reduced spacing
                  borderRadius: 2,
                  display: 'flex',
                  overflow: 'hidden',
                  bgcolor: 'grey.900',
                  position: 'relative',
                  alignItems: 'center',
                  textAlign: 'center',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease-in-out',
                  animation: 'float 6s ease-in-out infinite',
                  boxShadow: `0 0 20px ${theme.vars.palette.primary.main}`,
                  border: `solid 2px transparent`,
                  backgroundClip: 'padding-box',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    borderRadius: 'inherit',
                    padding: '2px',
                    background: `linear-gradient(45deg,

                    
      ${theme.vars.palette.primary.main},
      ${theme.vars.palette.warning.main},
      ${theme.vars.palette.error.main},
      ${theme.vars.palette.primary.main}
    )`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    animation: 'borderRotate 4s linear infinite',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 0 30px ${theme.vars.palette.primary.main}`,
                  },
                  '@keyframes float': {
                    '0%, 100%': {
                      transform: 'translateY(0)',
                    },
                    '50%': {
                      transform: 'translateY(-10px)',
                    },
                  },
                  '@keyframes borderRotate': {
                    '0%': {
                      filter: 'hue-rotate(0deg)',
                    },
                    '100%': {
                      filter: 'hue-rotate(360deg)',
                    },
                  },
                })}
              >
                {renderLines()}
                {renderImage()}
                {renderDescription({
                  title: card.title,
                  subtitle: card.subtitle,
                  primaryLink: card.primaryLink,
                  primaryButtonText: card.primaryButtonText,
                  secondaryLink: card.secondaryLink,
                  secondaryButtonText: card.secondaryButtonText,
                })}
                {renderBlur()}
              </Box>
            </Container>
          ))}
        </Box>
      </Box>
    </MotionViewport>
  );
}
const renderLines = () => (
  <>
    <FloatPlusIcon sx={{ left: 72, top: '50%', mt: -1 }} />
    <FloatLine vertical sx={{ top: 0, left: 80, height: 'calc(50% + 64px)' }} />
    <FloatLine sx={{ top: '50%', left: 0 }} />
  </>
);

const renderDescription = (description = {}) => (
  <Stack spacing={5} sx={{ zIndex: 9 }}>
    <Box
      component={m.h2}
      variants={varFade('inDown', { distance: 24 })}
      sx={{
        m: 0,
        color: 'common.white',
        typography: { xs: 'h2', md: 'h1' },
      }}
    >
      {description.title || 'Default Title'}
      <br />
      <Box
        component="span"
        sx={(theme) => ({
          ...theme.mixins.textGradient(
            `to right, ${theme.vars.palette.common.white}, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.4)}`
          ),
          ml: 1,
        })}
      >
        {description.subtitle || 'Default Subtitle'}
      </Box>
    </Box>

    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', md: 'flex-start' },
      }}
    >
      <m.div variants={varFade('inRight', { distance: 24 })}>
        <Button
          color="primary"
          size="large"
          variant="contained"
          target="_blank"
          rel="noopener"
          href={description.primaryLink || '#'}
        >
          {description.primaryButtonText || 'Default Button'}
        </Button>
      </m.div>

      <m.div variants={varFade('inRight', { distance: 24 })}>
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          target="_blank"
          rel="noopener"
          href={description.secondaryLink || '#'}
          startIcon={<Iconify width={16} icon="eva:external-link-fill" sx={{ mr: 0.5 }} />}
          sx={{
            color: 'common.white',
            borderColor: 'common.white',
            '&:hover': { borderColor: 'currentColor' },
          }}
        >
          {description.secondaryButtonText || 'Default Secondary Button'}
        </Button>
      </m.div>
    </Box>
  </Stack>
);
const renderImage = (imageUrl) => (
  <m.div variants={varFade('inUp')}>
    <Box
      component={m.img}
      animate={{ y: [-20, 0, -20] }}
      transition={{ duration: 4, repeat: Infinity }}
      alt="Trade illustration"
      src={imageUrl}
      sx={{
        zIndex: 9,
        width: 360,
        aspectRatio: '1/1',
        position: 'relative',
      }}
    />
  </m.div>
);
const renderBlur = () => (
  <Box
    component="span"
    sx={(theme) => ({
      top: 0,
      right: 0,
      zIndex: 7,
      width: 1,
      opacity: 0.4,
      maxWidth: 420,
      aspectRatio: '1/1',
      position: 'absolute',
      backgroundImage: `radial-gradient(farthest-side at top right, ${theme.vars.palette.grey[500]} 0%, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)} 75%, transparent 90%)`,
    })}
  />
);
{
  cards.map((card) => (
    <Container
      key={card.id}
      sx={{
        flex: '0 0 100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={(theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
              `linear-gradient(90deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
            ],
            sizes: ['36px 36px'],
            repeats: ['repeat'],
          }),
          py: 8,
          px: 5,
          spacing: 5,
          borderRadius: 3,
          display: 'flex',
          overflow: 'hidden',
          bgcolor: 'grey.900',
          position: 'relative',
          alignItems: 'center',
          textAlign: 'center',
          border: `solid 1px ${theme.vars.palette.grey[800]}`,
        })}
      >
        {renderLines()}
        {renderImage(card.image)}
        {renderDescription({
          title: card.title,
          subtitle: card.subtitle,
          primaryLink: card.primaryLink,
          primaryButtonText: card.primaryButtonText,
          secondaryLink: card.secondaryLink,
          secondaryButtonText: card.secondaryButtonText,
        })}
        {renderBlur()}
      </Box>
    </Container>
  ));
}
