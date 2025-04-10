/* eslint-disable react/prop-types */
import  { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, Typography, Box } from "@mui/material";

const TermsAndConditionsModal = ({ open, onClose, onAccept }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogContent dividers>
        <Box className="max-h-[300px] overflow-y-auto p-[10px] border border-[#ccc] rounded-[5px]">
          <Typography variant="body2">
    <h2>1. Introduction</h2>
    <p>Welcome to CodeConnect (&quot;Website&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>

    <h2>2. Use of the Website</h2>
    <p>You must be at least 18 years old to use this website. By using this site, you represent that you meet this age requirement.</p>
    <p>You agree not to use this website for any unlawful or prohibited activities.</p>

    <h2>3. Intellectual Property</h2>
    <p>All content on this website, including text, graphics, logos, and images, is the property of CodeConnect or its content suppliers and is protected by intellectual property laws. You may not use, copy, or distribute any content without our prior written consent.</p>

    <h2>4. User-Generated Content</h2>
    <p>If you post content on this website, you grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, and distribute such content.</p>

    <h2>5. Disclaimers and Limitations of Liability</h2>
    <p>This website is provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not guarantee that the website will be error-free or uninterrupted.</p>
    <p>We are not responsible for any damages resulting from your use of this website.</p>

    <h2>6. Third-Party Links</h2>
    <p>Our website may contain links to third-party websites. We do not endorse or take responsibility for their content or practices.</p>

    <h2>7. Privacy Policy</h2>
    <p>Your use of our website is also governed by our <a href="privacy-policy.html">Privacy Policy</a>.</p>

    <h2>8. Changes to These Terms</h2>
    <p>We may update these Terms and Conditions from time to time. Continued use of the website after changes means you accept the revised terms.</p>

    <h2>9. Contact Information</h2>
    <p>If you have any questions about these Terms and Conditions, you can contact us at codeconnect@outlook.com.</p>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
          label="I accept the Terms and Conditions"
        />
        <Button onClick={onClose} color="secondary">
          Decline
        </Button>
        <Button onClick={onAccept} color="primary" variant="contained" disabled={!checked}>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsAndConditionsModal;
