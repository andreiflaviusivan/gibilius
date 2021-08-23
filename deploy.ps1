#!/usr/bin/pwsh

if ($args.length -le 0) {
	Write-Error "You need to supply an IP address!"

	exit 123;
}

$ip = $args[0]
$location = "pm2"
$split = $(pwd).Path.Split('/')
$app = $split[$split.Length - 1]

ssh -i ./ssh-keys/id_rsa pi@$ip "mkdir -p $location/$app"
scp -i ./ssh-keys/id_rsa -r pi@$ip ./dist *.json *.lock  *.sh "pi@${ip}:~/$location/$app"
ssh -i ./ssh-keys/id_rsa pi@$ip "cd $location/$app; yarn; pm2 restart gibilius && pm2 save"
