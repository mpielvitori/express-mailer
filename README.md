# Mailer

## Usage

POST -> /email

```
"message": {
		"to": "martinpielvitori@gmail.com",
		"subject": "My Subject",
		"body": "My body"
	},
	"options": {
		"template": "sampleTemplate",
		"params": {
			"username": "martin",
			"code": 12345
		}
	}
```
